import styled from "styled-components";
import { sharedTheme } from "../../styles/theme/theme";
import Badge from "./Badge";
// import { Badge }
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
`;

const TableHead = styled.thead`
  background-color: #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;

  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  border-bottom: 1px solid #e5e7eb;
`;

const TableBody = styled.tbody`
  tr {
    cursor: pointer;
  }
  tr:nth-child(even) {
    background-color: #f9fafb;
  }
`;

const TableRow = styled.tr`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    /* transform: scale(1.01); */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
  &:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  &:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const TableCellPayment = styled(TableCell)`
  color: #059669;
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const CampaignTable = () => {
  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <tr>
            <TableHeader>Campaign</TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Payout</TableHeader>
            <TableHeader>Status</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Summer Fashion Collection</TableCell>
            <TableCell>StyleHub</TableCell>
            <TableCell>May 15, 2025</TableCell>
            <TableCellPayment>₹5,000</TableCellPayment>
            <TableCell>
              <Badge variant="info">In Progress</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fitness App Promotion</TableCell>
            <TableCell>FitLife</TableCell>
            <TableCell>May 20, 2025</TableCell>
            <TableCellPayment>₹4,500</TableCellPayment>
            <TableCell>
              <Badge variant="warning">Content Approval</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Organic Food Review</TableCell>
            <TableCell>NatureEats</TableCell>
            <TableCell>May 25, 2025</TableCell>
            <TableCellPayment>₹3,000</TableCellPayment>
            <TableCell>
              <Badge>Negotiation</Badge>{" "}
            </TableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default CampaignTable;
