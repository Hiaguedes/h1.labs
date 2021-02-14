import { LayoutStyles } from '../layouts/layouts.styles';
import Sidebar from '../components/Sidebar'

export default function Layout({children}) {
  const {LayoutContainer, Content} = LayoutStyles;
  return (
    <>
    <LayoutContainer>
      <Sidebar />
    <Content>{children}</Content>
    </LayoutContainer>
    </>
  )
}