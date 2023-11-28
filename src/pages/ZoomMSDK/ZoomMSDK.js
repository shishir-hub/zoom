import React, { useEffect } from 'react'
import { ZoomMtg } from '@zoomus/websdk'
import axios from 'axios';


ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.17.0/lib", "/av");

const ZoomMSDK = ({ user }) => {
    const {
        REACT_APP_ZOOM_MSDK_KEY = "",
        REACT_APP_MSDK_SIGNATURE_ENDPOINT = "",
        LEAVE_URL = "https://zoom-lilac.vercel.app/",
    } = process.env;

    const queryParams = new URLSearchParams(window.location.search);
    const mn = queryParams.get("mn");
    const pw = queryParams.get("pw");

    const getSignature = async (e) => {
        if (e) {
            e.preventDefault();
        }
        let data = {
            meetingNumber: mn,
            role: user.role,
        }

        console.log(data);

        axios.post(REACT_APP_MSDK_SIGNATURE_ENDPOINT, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => {
                startMeeting(data.data.signature)
            })
            .catch(err => {
                console.log(err);
            })

    }

    const startMeeting = (signature) => {
        document.getElementById("zmmtg-root").style.display = "block";

        ZoomMtg.init({
            leaveUrl: LEAVE_URL,
            success: (success) => {
                console.log(success);

                ZoomMtg.join({
                    signature: signature,
                    sdkKey: REACT_APP_ZOOM_MSDK_KEY,
                    meetingNumber: mn,
                    passWord: pw,
                    userName: user.userName,
                    userEmail: user.userEmail,
                    success: (success) => {
                        console.log(success);
                    },
                    error: (error) => {
                        console.log(error);
                    }
                })
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    useEffect(() => {
        const mn = queryParams.get("mn");
        const pw = queryParams.get("pw");

        if (mn && pw) {
            getSignature();
        }
        // eslint-disable-next-line
    }, [mn, pw]);

    return (
        <div>
            <h1>hi</h1>
        </div>
    )
}

export default ZoomMSDK