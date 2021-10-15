const migration = (className,con)=>{
    classNameToUpper = className.charAt(0).toUpperCase() + className.slice(1)
    const format = `class ${classNameToUpper} {
      ${con}
    }`
    return  format;
}

module.exports = migration