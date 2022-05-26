import React from "react";

const DeleteConfirmModal = ({deleteButtonClicked}) => {
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
                    <h3 className="font-bold text-lg text-secondary mb-4">
                        Are you sure ?
                    </h3>
                    <div class="modal-action">
                        <button onClick={deleteButtonClicked} class="btn btn-error">
                            Delete
                        </button>
                        <label for="delete-confirm-modal" class="btn btn-success">
                            Cancel
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
