import s from "./style.module.css";
const TermsAndConditions = () => {
  return (
    <>
      <div className={s.container}>
        <h2 className={s.heading}>Terms & conditions</h2>
        <div className={s.policyContainer}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div className={s.policy} key={i}>
              <h2>Section 1.10.32 of "de Finibus.</h2>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;