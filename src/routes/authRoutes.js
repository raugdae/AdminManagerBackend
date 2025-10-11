import express from 'express';
import * as authController from '../controllers/authController.js';
import {authenticateToken} from '../middleware/auth.js';
import swaggerJSDoc from 'swagger-jsdoc';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:                                    
 *     summary: User registration endpoint
 *     tags:                                  
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email                     
 *               - password
 *             properties:
 *               email:                       
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *                 minLength: 8               
 *     responses:
 *       201:                                 
 *         description: User successfully registered
 *         content:
 *           application/json:                
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: Bearer token  
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:                                 
 *         description: Invalid input
 *       409:                                 
 *         description: Email already exists
 *       500:
 *         description: Server error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Bearer token
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', authController.login);

export default router;