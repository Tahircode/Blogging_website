
import { Qoute } from "../component/Qoute"
import { Auth } from "../component/Auth"
export const Signin = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                < Auth type="signin" />
            </div>
            <div className="hidden lg:block">
                <Qoute />
            </div>
        </div>
    </div>
}



