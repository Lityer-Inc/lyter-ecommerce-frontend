import  express  from "express";
import { userRegisterController, userLoginController,userLogoutController, userGetController, adminRegisterController, getAdminsController, getSpecificAdminController, addToCartController, getCartController, updateCartItemController, deleteCartItemController } from "../controller/userController.js";
import { authentication } from "../middleWare/authentication.js";
import { jwtVerify } from "./jwt.js";
const userRouter=express.Router();

userRouter.get('/decodeJwt', jwtVerify);
userRouter.post("/register", userRegisterController);
userRouter.post("/login", userLoginController);
userRouter.post("/logout",  authentication, userLogoutController);
userRouter.get("/:userId", authentication, userGetController);

userRouter.post("/admin/register",adminRegisterController);
userRouter.get("/admin",getAdminsController);
userRouter.get("/admin/:adminId",getSpecificAdminController);
userRouter.post("/:userId/cart",addToCartController);
userRouter.get("/:userId/cart",getCartController);
userRouter.put("/:userId/cart",updateCartItemController);
userRouter.delete("/:userId/cart",deleteCartItemController);
  
export default userRouter;