(() => {
  const placeholders = {
    operatorName: '请填写运营者姓名或名称',
    supportEmail: '请填写客服邮箱',
    appFilingNumber: '请填写 APP 备案号',
  };
  const config = window.SUISUIJI_POLICY_CONFIG || {};
  const value = (key, fallback) => String(config[key] || fallback).trim();
  const operatorName = value('operatorName', placeholders.operatorName);
  const supportEmail = value('supportEmail', placeholders.supportEmail);
  const filingNumber = value('appFilingNumber', placeholders.appFilingNumber);

  document.querySelector('#operator-name').textContent = operatorName;
  document.querySelector('#footer-operator').textContent = operatorName;
  document.querySelector('#effective-date').textContent = value('effectiveDate', '2026-10-25');
  document.querySelector('#app-version').textContent = value('appVersion', '1.0.0');
  document.querySelector('#app-filing-number').textContent = filingNumber;
  document.querySelector('#year').textContent = new Date().getFullYear();

  const email = document.querySelector('#support-email');
  email.textContent = supportEmail;
  if (supportEmail !== placeholders.supportEmail) {
    email.href = `mailto:${supportEmail}`;
  } else {
    email.removeAttribute('href');
  }

  const needsConfiguration =
    !window.SUISUIJI_POLICY_CONFIG ||
    [operatorName, supportEmail, filingNumber].some((item) =>
      Object.values(placeholders).includes(item),
    );
  const configurationNotice = document.querySelector('#configuration-notice');
  configurationNotice.hidden = !needsConfiguration;
  if (!needsConfiguration) {
    configurationNotice.style.display = 'none';
  }
})();
