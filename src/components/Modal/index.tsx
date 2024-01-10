import dynamic from "next/dynamic";

const AlertModal = dynamic(() => import("./AlertModal"));

export { AlertModal };
