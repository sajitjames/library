import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import PropTypes from "prop-types";
import { RowEditContext } from "../Utilities/TagsContext";
import RowEditTag from "./RowEditTag";

const RowEditOverLay = ({
    row,
    columns,
    isRowExpandEnabled,
    additionalColumn,
    getRowEditOverlay,
    closeRowEditOverlay,
    updateRowInGrid
}) => {
    const [editedRowValue, setEditedRowValue] = useState(null);

    const getUpdatedRowValue = (value) => {
        if (value) {
            setEditedRowValue(value);
        }
    };

    const saveRowEdit = () => {
        if (editedRowValue) {
            updateRowInGrid(row, editedRowValue);
        }
        closeRowEditOverlay();
    };

    const originalRowValue = { ...row };
    const rowEditContent = getRowEditOverlay(
        originalRowValue,
        RowEditTag,
        getUpdatedRowValue
    );
    return (
        <RowEditContext.Provider
            value={{
                columns,
                additionalColumn,
                isRowExpandEnabled
            }}
        >
            <ClickAwayListener
                className="row-option-action-overlay"
                data-testid="rowEditOverlay-container"
                onClickAway={closeRowEditOverlay}
            >
                {rowEditContent}
                <div className="cancel-save-buttons">
                    <button
                        type="button"
                        className="save-Button"
                        data-testid="rowEditOverlay-save"
                        onClick={saveRowEdit}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="cancel-Button"
                        data-testid="rowEditOverlay-cancel"
                        onClick={closeRowEditOverlay}
                    >
                        Cancel
                    </button>
                </div>
            </ClickAwayListener>
        </RowEditContext.Provider>
    );
};
RowEditOverLay.propTypes = {
    row: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object),
    isRowExpandEnabled: PropTypes.bool,
    additionalColumn: PropTypes.object,
    getRowEditOverlay: PropTypes.func,
    closeRowEditOverlay: PropTypes.func,
    updateRowInGrid: PropTypes.func
};

export default RowEditOverLay;
