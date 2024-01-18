import React from "react";

const CatPawInput: React.FC<{
    isNew?: boolean;
    value: string | number;
    type?: string;
    readonly?: boolean;
    disabled?: boolean;
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => any;
    enterHandler?: () => void;
    blurHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
    isNew,
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

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (blurHandler) blurHandler(e);
    };

    return (
        <div className="input-wrapper">
            <input
                className={isNew ? "board" : "content"}
                value={value}
                type={type}
                readOnly={readonly ?? false}
                disabled={disabled ?? false}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                placeholder={
                    isNew ? "보드 이름을 입력하세요" : "일감을 추가하세요"
                }
            />
        </div>
    );
};

export default CatPawInput;
