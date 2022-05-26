import React from "react";
import { BsTrash } from "react-icons/bs";

const DeleteConfirmModal = ({ deleteButtonClicked, title }) => {
    return (
        <div>
            <input
                type="checkbox"
                id="delete-confirm-modal"
                className="modal-toggle"
            />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label
                        htmlFor="delete-confirm-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="font-bold text-2xl text-warning text-left mb-4 mr-2">
                        Are you sure want to delete: {title} ?
                    </h3>
                    <div className="modal-action">
                        <button
                            onClick={deleteButtonClicked}
                            className="btn btn-ghost text-error"
                        >
                            <BsTrash className="mr-1" /> Delete
                        </button>
                        <label
                            for="delete-confirm-modal"
                            className="btn btn-ghost text-success"
                        >
                            Cancel
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
