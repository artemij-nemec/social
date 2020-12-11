export const required = (value: string) => {
    if (value) return undefined

    return "Field is required"
}

export const maxLengthRuleCreator = (maxLength: number) => {
    return { max: maxLength, message: `Max length is ${maxLength} symbols` }
}
