import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
import LogIn from "../LogIn/LogIn";
import Membership from "../Membership/Membership";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import AddPost from "../Dashboard/AddPost";
import MyProfile from "../Dashboard/MyProfile";
import MyPosts from "../Dashboard/MyPosts";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import PostCart from "../Posts/PostCart";
import ReportComments from "../Dashboard/ReportComments";
import Announcement from "../Dashboard/Announcement";
import Notification from "../Notification/Notification";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/login",
          element:<LogIn></LogIn>
        },
        {
          path:"/membership",
          element:<Membership></Membership>
        },
        {
          path:"/joinus",
          element:<Register></Register>
        },{
          path:"/posts/:id",
          element:<PostCart></PostCart>,
          loader:({params})=>fetch(`https://opinionloom-server-58m8otk87-md-muhtasim-fuad-rahats-projects.vercel.app/posts/${params.id}`)
        },
        {
          path:'/notification',
          element:<Notification></Notification>
        },
        {
          path:"dashboard",
          element:<Dashboard></Dashboard>,
          children:[
            {
              path:'myProfile',
              element:<MyProfile></MyProfile>
            },
            {
              path:'addPost',
              element:<AddPost></AddPost>
            },
            {
              path:'myPosts',
              element:<MyPosts></MyPosts>
            },
          
            //Admin Routes
            {
              path:'manageUsers',
              element:<ManageUsers></ManageUsers>,
            },
            {
              path:'reportComments',
              element:<ReportComments></ReportComments>
            },
            {
              path:'announcement',
              element:<Announcement></Announcement>
            }

          ]
        }
      ]
    },
  ]);

  export default router;