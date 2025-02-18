import { Link } from "react-router-dom"

const RoleCard = ({role, title, description, icon, cta}) => {
  return (
    <div className={`${role === "guest" ? 'bg-accent-green' : 'bg-accent-purple'} p-5 md:p-10 rounded-xl flex flex-col justify-between gap-3`}>
        <div className="text-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p>{description}</p>
        </div>
        <div className="flex flex-col justify-between gap-2">
            <img src={icon} className="h-5/6 mx-auto"/>
            <Link to={`/register/${role}`} className="mx-auto bg-secondary text-primary py-2 w-full rounded-lg block text-center hover:opacity-80 duration-200">{cta}</Link>
        </div>
    </div>
  )
}

export default RoleCard