import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to={"/"} className="font-medium text-base sm:text-xl">
        <span className="text-secondary">booka</span><span className="text-accent-purple">place</span>
    </Link>
  )
}

export default Logo