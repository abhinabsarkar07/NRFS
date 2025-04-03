const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

/**
 * Register a new user
 */
const register = async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, email, password, role = "user" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { rows: existing } = await client.query("SELECT id FROM users WHERE email = $1", [normalizedEmail]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const { rows: users } = await client.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
      [name.trim(), normalizedEmail, hashedPassword, role]
    );

    res.status(201).json({ message: "User registered successfully", user: users[0] });
  } catch (error) {
    console.error("🧨 Registration Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
};

/**
 * Authenticate user and return token
 */
const login = async (req, res) => {
  const client = await pool.connect();
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();
    const { rows } = await client.query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("🧨 Login Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
};

/**
 * Get current user's profile (Protected)
 */
const getProfile = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [req.user.id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("🧨 Profile Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
};

module.exports = { register, login, getProfile };
