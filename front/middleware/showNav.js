export default function({ store }) {
  if (store.state.showNav === true) store.state.showNav = false;
}
