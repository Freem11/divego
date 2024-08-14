// import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";


// const PORTAL_ERROR_MSG = `There is no portal container in layout`;

// const Portal = (props) => {
//   const { id, children } = props;
//   const [container, setContainer] = useState();

//   useEffect(() => {
//     if (id) {
//       const portalContainer = document.getElementById(id);

//       if (!portalContainer) {
//         throw new Error(PORTAL_ERROR_MSG);
//       }

//       setContainer(portalContainer);
//     }
//   }, [id]);

//   return container ? createPortal(children, container) : null;
// };

// // export { createContainer, PORTAL_ERROR_MSG };
// export default Portal;