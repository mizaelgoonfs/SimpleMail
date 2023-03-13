import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IoIconsV5 from "react-icons/io5";

export const SidebarData = [
    {
        title: "Nova Mensagem",
        path: "/new",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text",
      },
    {
        title: "Caixa de entrada",
        path: "/messages",
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: "nav-text",
    },
    {
        title: "Enviadas",
        path: "/sent",
        icon: <IoIconsV5.IoSendSharp />,
        cName: "nav-text",
    },
];