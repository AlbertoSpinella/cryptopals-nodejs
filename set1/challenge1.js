export const set1Challenge1 = () => {
    const str = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";
    const b64 = Buffer.from(str, "hex").toString("base64");
    
    console.log(`The base64 encoding is\n${b64}`);
};