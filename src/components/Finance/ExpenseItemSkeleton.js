import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

function ExpenseItemSkeleton() {
  return (
    <>
      <ListItem className="nplr" style={{ marginBottom: 4, marginTop: 4 }}>
        <ListItemAvatar>
          <Skeleton variant="circle">
            <Avatar />
          </Skeleton>
        </ListItemAvatar>
        <ListItemText>
          <Skeleton animation="wave" height={20} width="60%" style={{ marginBottom: 5 }} />
          <Skeleton animation="wave" height={15} width="40%" />
        </ListItemText>
        <ListItemSecondaryAction className="nr">
          <Skeleton animation="wave" height={30} width="2rem" />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
}

export default ExpenseItemSkeleton;
