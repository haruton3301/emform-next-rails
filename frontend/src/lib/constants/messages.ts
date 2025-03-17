const messages = {
  signUpSuccessfulMessage: "登録が完了しました",
  commonMessage: "エラーが発生しました",
  emailAlreadyTakenMessage: "既に登録されているメールアドレスです",
  invalidCredentialsMessage: "メールアドレスまたはパスワードが違います",
  invalidAuthHeadersMessage: "不正な認証情報です",
  requiredMessage: "必須です",
  maxLengthMessage: (length: number) => `${length}文字以下で入力してください`,
  emailInvalidFormtMessage: "有効なメールアドレスを入力してください",
  passwordMinimumSizeMessage: "パスワードは6文字以上である必要があります",
  signInSuccessfulMessage: "ログインしました",
  signOutSuccessfulMessage: "ログアウトしました",
  reportNotFoundMessage: "日報が存在しません",
  formCreatedMessage: "フォームを作成しました",
  reportUpdatedMessage: "日報を更新しました",
  reportDeletedMessage: "日報を削除しました",
  reportNotExistMessage: "日報がありません",
}

export default messages
