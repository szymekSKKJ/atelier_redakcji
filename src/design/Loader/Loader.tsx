import styles from "./styles.module.scss";

const Loader = ({ ...rest }) => {
  return (
    <div className={`${styles.loader}`} {...rest}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
