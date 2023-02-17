import { Navigate } from "react-router";

const PrivateRoute = ({user, children}) => {
 
    if(!user.user.admin){
        
        return <Navigate to="/" replace />;
    }
    
    return children;
  

}
   
export default PrivateRoute;