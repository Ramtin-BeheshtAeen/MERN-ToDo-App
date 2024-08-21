import "./styles.css";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import Header from "./components/Header";
import Content from "./components/Content";
export default function App() {
  return (
    <>
      <Header />

      <Content />
    </>
  );
}
