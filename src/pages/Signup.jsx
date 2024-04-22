import signupImg from "../assets/group.png"
import Template from "../components/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join with us for free"
      description1="It is health that is real wealth and not pieces of gold and silver.."
    description2="A fit body, a calm mind, a house full of love. These things cannot be bought – they must be earned."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup