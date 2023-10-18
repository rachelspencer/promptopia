import { Scheme, model, models } from "mongose";

const UserSchema = newSchema({
    email: {
        tpye: String,
        unique: [ true, "Email already exists"],
        required: [ true, "Email is required"],
    },
    username: {
        tpye: String,
        required: [ true, "Username is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", UserSchema);

export default User;