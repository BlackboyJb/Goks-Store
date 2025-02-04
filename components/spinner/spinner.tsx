'use client'

import { DotLoader } from "react-spinners";

const Spinner = () => {
    return (
        <>
            <DotLoader
                color="grey"
                loading
                size={100}
                speedMultiplier={1}
            // cssOverride={{
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            // }}
            />
        </>
    );
}

export default Spinner;