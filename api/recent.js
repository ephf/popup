window.p = (type) => {
  const handler = (a, isPopup) => {
    a.onclick = (e) => {
      e.preventDefault();
      window.open(a.href, "", isPopup ? ["popout=true"] : []);
    };
  };
  const observer = (isPopup) => {
    const o = new MutationObserver((list) => {
      list.forEach((mutation) => {
        mutation.addedNodes.forEach((element) => {
          if (element.localName == "a") handler(element, isPopup);
        });
      });
    });
    o.observe(document.body, { subtree: true, childList: true });
  };
  const as = document.getElementsByTagName("a");
  if (type == "new" || !type)
    return [...as].forEach((a) => handler(a, false)), observer(false), as;
  if (type == "popout")
    return [...as].forEach((a) => handler(a, true)), observer(true), as;
  console.warn(
    `type "${type}" is not a valid type.\n\nChoose either: "new" or "popout"`
  );
};
p.set = (a, type) => {
  if (type != "popout" || type != "new")
    return console.warn(
      `type "${type}" is not a valid type.\n\nChoose either: "new" or "popout"`
    );
  a.onclick = (e) => {
    e.preventDefault();
    window.open(a.href, "", type == "popout" ? ["popout=true"] : []);
  };
};
