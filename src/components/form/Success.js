import React from 'react';
import {useRouter} from 'next/router';
import Link from "next/link";
import ChooseFuneral from "@/components/form/ChooseFuneral";

const Success = () => {
    const router = useRouter();


    return (
        <div className="container">
            <div className="message-success">
                <div className="message">
                    Formularz został wysłany, skontaktujemy się z Tobą jak najszybciej
                </div>
                <ChooseFuneral success={true}/>
                <Link href={"/login"} className="change-button">Sprawdź swoje zgłoszenie</Link>
            </div>
        </div>
    );
};

export default Success;

