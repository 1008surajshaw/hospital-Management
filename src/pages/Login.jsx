import loginImg from "../assets/boycode.jpg"
import Template from "../components/Auth/Template"

export default function login ()  {
  return (
    <Template
    title="welcome back"
    formType="login"
    description1="It is health that is real wealth and not pieces of gold and silver.."
    description2="A fit body, a calm mind, a house full of love. These things cannot be bought – they must be earned."
    image={loginImg}
    >

    </Template>
  )
}
