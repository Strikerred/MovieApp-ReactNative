export const mainButton = (color, width = 200) => {
    return {
      marginTop: 30,
      marginBottom: 20,
      paddingVertical: 5,
      alignItems: 'center',
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      borderRadius: 5,
      width: width,
    };
  };
  
  export const mainButtonText = (color, size = 20) => {
    return {
      fontSize: size,
      color: color,
    };
  };
  