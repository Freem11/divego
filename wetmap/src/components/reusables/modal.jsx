import React from "react";
import { InputBase } from "@mui/material";

export default function Modal(props) {
  

  return <div class="modal active" id="modal-id">
          <a href="#close" class="modal-overlay" aria-label="Close"></a>
          <div class="modal-container">
            <div class="modal-header">
              <a href="#close" class="btn btn-clear float-right" aria-label="Close"></a>
              <div class="modal-title h5">Modal title</div>
            </div>
            <div class="modal-body">
              <div class="content">
                {props.children}
              </div>
            </div>
            {/* <div class="modal-footer">
              ...
            </div> */}
          </div>
        </div>
}
