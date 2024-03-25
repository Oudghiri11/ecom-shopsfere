const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;
const authRouter = require("./Routes/authRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

// Utiliser le middleware pour parser les corps de requête JSON
app.use(express.json());
// Utiliser le middleware pour parser les corps de requête URL-encodés
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    `mongodb+srv://ahmedoudrhiri123321:${process.env.MONGODB_PASSWORD}@cluster0.aropvrt.mongodb.net`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running at PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Quitter l'application en cas d'erreur de connexion à MongoDB
  });

// Route pour l'authentification des utilisateurs
app.use("/api/user", authRouter);

// Middleware pour gérer les erreurs 404 (non trouvé)
app.use(notFound);

// Middleware pour gérer les erreurs
app.use(errorHandler);
