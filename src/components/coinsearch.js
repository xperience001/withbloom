import React from "react";
import { Input } from "antd";

const Search = Input.Search;

export const CoinSearch = ({ onSearch, ...props }) => (
  <div {...props}>
    <Search
      placeholder="Enter Coin"
      onSearch={onSearch}
      style={{ width: 200 }}
    />
  </div>
);
