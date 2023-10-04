import BaseLayout from "../components/baseLayout/page";
import Sidebar from "../components/sidebar/page";

import PatientInfo from "../components/patientInfo/page"; // import the component with proper casing
import TestDetailsForm from "../components/test_info/page";

export default function HomePage() {
    return (
        <BaseLayout>
            <div style={{ display: "flex" }}>

                 <div>
                    <Sidebar/>
                 </div>

                <div>
                    <PatientInfo/>      
                </div>
                <div>
                    <TestDetailsForm/>
                </div>
            </div>
        </BaseLayout>
    )
}
