import site from "@/lib/constants/site"

type Props = {
  title?: string
}

export default function MetaTitle({ title }: Props) {
  return <title>{title ? `${title} - ${site.title}` : site.title}</title>
}
