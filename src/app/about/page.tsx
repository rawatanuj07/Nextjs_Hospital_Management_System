import BaseLayout from "../components/baseLayout/page";
import Sidebar from "../components/sidebar/page";

export default function AboutPage() {
    return (
        <BaseLayout>
       
        {/* <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1> Profile </h1>
        <hr/>
        <p> This is the profile page  </p>
         */}
         <div>
        <Sidebar/>
        </div>
        </BaseLayout>
    )
}