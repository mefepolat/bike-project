import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({user, children}) => {
    const location = useLocation();
    if(!user.user.admin){
        
        return <Navigate to="/" state={{ from: location.pathname }} />;
    }
    
    return children;
  

}
   
export default PrivateRoute;