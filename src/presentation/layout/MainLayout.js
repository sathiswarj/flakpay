import { connect } from "react-redux";
import SideBar from "./SideBar";
import TopNavBar from "./TopNavBar";
import ResizeListener from "../../utility/ResizeListener";

const MainLayout = ({ isAuthenticated, children }) => {
  const { width, height } = ResizeListener();

  return isAuthenticated ? (
    <div
      style={{
        width: "100%",
        height: height,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopNavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        <SideBar />
        <div style={{ width: "100%", height: "100%" }}>{children}</div>
      </div>
    </div>
  ) : (
    <div style={{ width: "100%", height: "100%" }}>{children}</div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};
export default connect(mapStateToProps)(MainLayout);
