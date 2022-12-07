import { useEffect } from "react";
import { useState } from "react";
import SwitchButton from "../../components/switchBtn/SwitchButton";
import s from "./style.module.css";
const Settings = () => {
  const [mduAutomatic, setMduAutomatic] = useState(getValue("mduAutomatic"));
  const [mduWifiOnly, setMduWifiOnly] = useState(getValue("mduWifiOnly"));
  const [mduSaveMobileData, setMduSaveMobileData] = useState(
    getValue("mduSaveMobileData")
  );
  const [dWifiOnly, setdWifiOnly] = useState(getValue("dWifiOnly"));

  const [pnEnable, setpnEnable] = useState(getValue("pnEnable"));

  //saving the settings
  useEffect(() => {
    setValue("mduAutomatic", mduAutomatic);
  }, [mduAutomatic]);
  useEffect(() => {
    setValue("mduWifiOnly", mduWifiOnly);
  }, [mduWifiOnly]);
  useEffect(() => {
    setValue("mduSaveMobileData", mduSaveMobileData);
  }, [mduSaveMobileData]);
  useEffect(() => {
    setValue("dWifiOnly", dWifiOnly);
  }, [dWifiOnly]);
  useEffect(() => {
    setValue("pnEnable", pnEnable);
  }, [pnEnable]);

  function getValue(key) {
    const value = JSON.parse(localStorage.getItem(key));
    if (key === "mduAutomatic" || key === "dWifiOnly") {
      if (value === null) {
        return true;
      }
    }
    return value;
  }
  function setValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  return (
    <>
      <div className={s.container}>
        <h2 className={s.heading}>Settings</h2>
        <div className={s.content}>
          <section>
            <h2 className={s.sectName}>Mobile Data Usage</h2>
            <div className={s.setting}>
              <span>Automatic</span>
              <span>
                <SwitchButton
                  size={40}
                  enabled={mduAutomatic}
                  onClick={() => {
                    setMduAutomatic((prev) => !prev);
                  }}
                />
              </span>
            </div>
            <div className={s.setting}>
              <span>WiFi Only</span>
              <span>
                <SwitchButton
                  size={40}
                  enabled={mduWifiOnly}
                  onClick={() => {
                    setMduWifiOnly((prev) => !prev);
                  }}
                />
              </span>
            </div>
            <div className={s.setting}>
              <span>Save Mobile Data</span>
              <span>
                <SwitchButton
                  size={40}
                  enabled={mduSaveMobileData}
                  onClick={() => {
                    setMduSaveMobileData((prev) => !prev);
                  }}
                />
              </span>
            </div>
          </section>
          <section>
            <h2 className={s.sectName}>Downloads</h2>
            <div className={s.setting}>
              <span>WiFi Only</span>
              <span>
                <SwitchButton
                  size={40}
                  enabled={dWifiOnly}
                  onClick={() => {
                    setdWifiOnly((prev) => !prev);
                  }}
                />
              </span>
            </div>
          </section>
          <section>
            <h2 className={s.sectName}>Push Notifications</h2>
            <div className={s.setting}>
              <span>Enable To Recieve</span>
              <span>
                {" "}
                <SwitchButton
                  size={40}
                  enabled={pnEnable}
                  onClick={() => {
                    setpnEnable((prev) => !prev);
                  }}
                />
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Settings;
