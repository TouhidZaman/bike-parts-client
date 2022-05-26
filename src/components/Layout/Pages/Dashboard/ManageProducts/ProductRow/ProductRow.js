import React from "react";
import { BsTrash } from "react-icons/bs";

const ProductRow = ({ product, index, setDeleteProduct, refetch }) => {
    const { image, name, availableQuantity, minOrderQuantity, price } = product;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="product" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                    </div>
                </div>
            </td>
            <td>{availableQuantity}</td>
            <td>{minOrderQuantity}</td>
            <td>{price}</td>
            <th>
                <label
                    htmlFor="delete-confirm-modal"
                    onClick={() => setDeleteProduct(product)}
                    className="btn btn-link"
                >
                    <BsTrash className="hover:text-red-400 text-xl text-warning" />
                </label>
            </th>
        </tr>
    );
};

export default ProductRow;
