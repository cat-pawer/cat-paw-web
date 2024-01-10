import React from "react";

const CatPawInput: React.FC<{
    value: string | number;
    type?: string;
    readonly?: boolean;
    disabled?: boolean;
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => any;
    enterHandler?: () => void;
    blurHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
    value,
    type,
    readonly,
    disabled,
    changeHandler,
    enterHandler,
    blurHandler,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (changeHandler) changeHandler(e);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (enterHandler) enterHandler();
        }
    };

    return (
        <div className="input-wrapper">
            <input
                value={value}
                type={type}
                readOnly={readonly ?? false}
                disabled={disabled ?? false}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onBlur={blurHandler}
            />
        </div>
    );
};

export default CatPawInput;
