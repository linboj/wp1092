import React, { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet-pro";
import xls from "jspreadsheet/xls";

import "/node_modules/jspreadsheet-pro/dist/jspreadsheet.css";
import "/node_modules/jsuites/dist/jsuites.css";

export default function App() {
    const spreadsheetRef = useRef(null);
    const license =
        "OWU5NmEwNjY1ODQxNDg4ODYyMjRlYjU0YzBmMmI1MDAxNTI1NzJlZWQyN2RmN2RiZjE0NGRhY2M0NzIyNjlhYWI2YTBlNGFkMzhjM2E0ZDZkZDZlYjhkNjkyMTNjZWM5ODYzMDE1ZWEzYjlmM2M0N2NmNDNiYzcwM2MzNjNhNzcsZXlKdVlXMWxJam9pY0dGMWJDNW9iMlJsYkNJc0ltUmhkR1VpT2pFMk5ETTJOek0yTURBc0ltUnZiV0ZwYmlJNld5SmpjMkl1WVhCd0lpd2lhbk5tYVdSa2JHVXVibVYwSWl3aWQyVmlMbUZ3Y0NJc0lteHZZMkZzYUc5emRDSmRMQ0p3YkdGdUlqb2lNeUo5";

    useEffect(() => {
        if (!spreadsheetRef.current.jexcel) {
            jspreadsheet(spreadsheetRef.current, [
                {
                    data: [],
                    minDimensions: [26, 100],
                    license: license
                },
            ]);
        }
    }, null);

    return (
        <div>
            <div ref={spreadsheetRef} />
            <br />
        </div>
    );
}