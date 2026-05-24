import styles from './Skeleton.module.css'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
}

export const Skeleton = ({ width = '100%', height = 16, borderRadius }: SkeletonProps) => (
  <div
    className={styles.skeleton}
    style={{ width, height, borderRadius }}
  />
)