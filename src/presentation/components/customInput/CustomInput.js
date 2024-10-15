// @flow
import Input from "./Input";

export const CustomInput = ({
  title,
  type,
  validator,
  value,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onPeriodChange,
  onChange,
  placeholder,
  options,
  error,
  showBadge,
  isSpaceRequired = false,
  containerStyles,
  inputStyles,
  maxLength,
  disabled = false,
  onPressEnter,
  autoFocus,
  isPassword,
  isSvgIconRequired,
  isOtpField,
  dataTestId,
  autoComplete = true,
  filterFocus,
  addMoney,
  dropdownImage,
  dropdownStyle,
  isLogin,
  inputcomponentStyles,
  rightIcon,
  isRightIconRequired,
  isMandatory = false,
  ref,
  readonly
}) => {
  let defaultContainerStyles = {
    paddingTop: 5,
    display: "flex",
    flexDirection: "column",
  };

  let defaultInputStyles = {
    boxShadow: "0.1px 0.1px 0.5px 1px white",
    borderRadius: 5,
    fontSize: 12,
    color: "black",
    height: 38,
    outline: "none",
    paddingTop: 3,
    paddingBottom: 3,
  };

  
  return (
    <Input
      title={title}
      maxLength={maxLength}
      type={type}
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      onPeriodChange={onPeriodChange}
      validator={validator}
      value={value}
      isMandatory={isMandatory}
      isSpaceRequired={isSpaceRequired}
      disabled={disabled}
      styles={{
        ...defaultInputStyles,
        ...inputStyles,
      }}
      showBadge={showBadge}
      errorMsgText={error}
      showErrorMsg={error}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      onPressEnter={onPressEnter}
      autoFocus={autoFocus}
      isPassword={isPassword}
      isSvgIconRequired={isSvgIconRequired}
      containerStyles={{
        ...defaultContainerStyles,
        ...containerStyles,
      }}
      readonly={readonly}
      imageUpload
      isOtpField={isOtpField}
      dataTestId={dataTestId}
      autoComplete={autoComplete}
      filterFocus={filterFocus}
      setNamesError={() => {}}
      addMoney={addMoney}
      dropdownImage={dropdownImage}
      dropdownStyle={{ ...dropdownStyle }}
      isLogin={isLogin}
      inputcomponentStyles={inputcomponentStyles}
      isRightIconRequired={isRightIconRequired}
      rightIcon={rightIcon}
      ref={ref}
    />
  );
};
