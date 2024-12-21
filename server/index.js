import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import OwnerModel from "./Models/OwnerModel.js";
import ProductsModel from "./Models/ProductsModel.js";
import UserModel from "./Models/UserModel.js";
import multer from "multer";
import CartModel from "./Models/CartModel.js";
import OrderModel from "./Models/OrderModel.js";
import AddressModel from "./Models/DeliveryModel.js";
import dotenv from "dotenv";
// Setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); 

dotenv.config();

//Database connection
const connectString =`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@miniprojectcluster.kkxpk.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=miniprojectCluster`;
 
mongoose.connect(connectString);

// Import the Order model

// Get all orders for the owner/admin to view
app.post("/place-order", async (req, res) => {
  const { userEmail, address, products, totalAmount } = req.body;

  try {
    const order = new OrderModel({
      userEmail,
      address,
      products,
      totalAmount,
    });

    await order.save();

    // Send order details to the owner or store here as needed
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});


app.get("/get-orders", async (req, res) => {
  try {
    const orders = await OrderModel.find(); // Fetch all orders
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// API to get all products
app.get('/getproducts', async (req, res) => {
  try {
    const baseUrl = req.protocol + "://" + req.get('host'); // Dynamically get the base URL
    const products = await ProductsModel.find(); // Fetch all products

    // Add full URL to image paths
    const updatedProducts = products.map((product) => ({
      ...product._doc, // Spread existing product fields
      image: product.image ? `${baseUrl}/${product.image}` : null, // Add full URL
    }));

    res.status(200).json({ success: true, products: updatedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


  
// API to add a product with image
const upload = multer({ dest: 'uploads/' });

app.post('/addProduct', upload.single('image'), async (req, res) => {
  try {
    const { productName, category, price } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const product = new ProductsModel({
      productName,
      category,
      image: imagePath,
      price,
    });

    const savedProduct = await product.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/products/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await ProductsModel.find({ category }); // Fetch products by category
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.post("/add-to-cart", async (req, res) => {
  const { userEmail, productId, productName, quantity, price } = req.body;

  // Validate required fields
  if (!userEmail || !productId || !productName || !price ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if the product already exists in the user's cart
    const existingCartItem = await CartModel.findOne({ userEmail, productId });

    if (existingCartItem) {
      // If it exists, update the quantity
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();
      return res.status(200).json({ message: "Cart updated", cartItem: existingCartItem });
    }

    // If it doesn't exist, create a new cart item
    const newCartItem = new CartModel({ userEmail, productId, productName, quantity, price });
    await newCartItem.save();
    res.status(201).json({ message: "Item added to cart", cartItem: newCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

app.get('/cart/:email', async (req, res) => {
  const { email } = req.params;
  
  try {
    const cartItems = await CartModel.find({ userEmail: email });
    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// Add this to your server-side routes (e.g., app.js or routes.js)

app.delete('/cart/:email/:productId', async (req, res) => {
  const { email, productId } = req.params;

  try {
    // Remove the product from the user's cart
    const removedItem = await CartModel.findOneAndDelete({ 
      userEmail: email, 
      productId: productId 
    });

    if (!removedItem) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    res.status(200).json({ message: 'Product removed from cart', removedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product from cart' });
  }
});

// Increase quantity by 1
app.patch('/cart/increase/:email/:productId', async (req, res) => {
  const { email, productId } = req.params;

  try {
    const updatedItem = await CartModel.findOneAndUpdate(
      { userEmail: email, productId: productId },
      { $inc: { quantity: 1 } }, // Increment the quantity by 1
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    res.status(200).json({ updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product quantity' });
  }
});

// Decrease quantity by 1
// Decrease quantity by 1
app.patch('/cart/decrease/:email/:productId', async (req, res) => {
  const { email, productId } = req.params;

  try {
    // Check if the product exists and has a quantity greater than 1
    const updatedItem = await CartModel.findOneAndUpdate(
      { userEmail: email, productId: productId, quantity: { $gt: 1 } },
      { $inc: { quantity: -1 } }, // Decrease the quantity by 1
      { new: true }
    );

    if (!updatedItem) {
      return res.status(400).json({ error: 'Product not found or quantity already 1' });
    }

    res.status(200).json({ updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product quantity' });
  }
});



app.post("/login", async (req, res) => { 
  try { 
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) { 
      res.status(500).send({ msg: " Couldn't find this email" });

    }
    else if (user.password !== password) {
      res.status(500).json({ msg: "Password is incorrect" });
    }
    else {
      res.send({user: user,msg:"Authentication is  successfull"})
    }
  }
  catch (error) { 
    res.status(500).json({error:"An unexpected error occurred"})
  }
})
//logout
app.post("/logout", async (req, res) => {
  try {
    res.send({ msg: "logout successful" });  // Ensure this is the last statement in the route
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Delete Product
app.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID and delete it
    const deletedProduct = await ProductsModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});
//Update Product
app.put("/updateProduct/:id", async (req, res) => {
  const { id } = req.params;
  const { productName, category, price, image } = req.body;

  try {
    const product = await ProductsModel.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.productName = productName || product.productName;
    product.category = category || product.category;
    product.price = price || product.price;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.status(200).json({ product: updatedProduct, msg: "Updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Search product
app.get('/searchProductsByName', async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query; // Extract search term and pagination parameters
    const nameRegex = new RegExp(name, 'i'); // Case-insensitive regex for the search term

    // Fetch matching products with pagination
    const products = await ProductsModel.find({ productName: nameRegex })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Total count of matching products
    const totalCount = await ProductsModel.countDocuments({ productName: nameRegex });

    res.status(200).json({
      success: true,
      products,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/registerUser",async(req,res)=>{
  try{
      
      const user = new UserModel({
         email: req.body.email,
         password : req.body.password
      });
      await user.save();
      res.send({user:user,msg:"Registered"});

  }catch(error){
      res.status(500).json({error: "An error occurred"})
  }

})
      
     

app.post("/loginOwner", async (req, res) => { 
  try { 
    const { email, password } = req.body;
    const owner = await OwnerModel.findOne({ email: email });

    if (!owner) { 
      res.status(500).send({ msg: " Couldn't find this email" });

    }
    else if (owner.password !== password) {
      res.status(500).json({ msg: "Password is incorrect" });
    }
    else {
      res.send({owner: owner,msg:"Authentication is  successfull"})
    }
  }
  catch (error) { 
    res.status(500).json({error:"An unexpected error occurred"})
  }
})

app.post("/registerOwner",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        //const hashedpassword = await bcrybt.hash(password,10);

        const owner = new OwnerModel({
            email:email,
            password:password,
        });
        await owner.save();
        res.send({owner:owner,msg:"Registered"});

    }catch(error){
        res.status(500).json({error: "An error occurred"})
    }

})
app.post("/AddAdress", async (req, res) => {
  const { email, name,postalcode, location,phone } = req.body;

  try {
    // If it doesn't exist, create a new cart item
    const newAddress = new AddressModel({ email, name,postalcode, location,phone });
    await newAddress.save();
    res.status(201).json({ message: "Adress ", adress: newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add" });
  }
});
app.get('/address/:email', async (req, res) => {
  const { email } = req.params;
  
  try {
    const adress = await AddressModel.find({ email: email });
    res.status(200).json({ adress });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch address" });
  }
});

app.delete('/address/:email/:AdressId', async (req, res) => {
  const { email, Adress } = req.params;

  try {
    // Remove the product from the user's cart
    const removedAddress= await AddressModel.findOneAndDelete({ 
      email: email, 
      Adress: Adress 
    });

    if (!removedAddress) {
      return res.status(404).json({ error: 'not found' });
    }

    res.status(200).json({ message: 'removed', removedAddress });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove ' });
  }
});


app.listen(process.env.PORT, () => {
    console.log("You are connected");
  });