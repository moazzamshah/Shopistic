import React from "react";
import CreateProduct from "../components/Product/CreateProduct";
import MyProducts from "../components/Product/MyProducts";

const Profile = () => {
  return (
    <div>
      <a href="/accountSetting">accout setting</a>
      <CreateProduct />
      <MyProducts />
    </div>
  );
};

export default Profile;
