import { NextRequest, NextResponse } from "next/server";
import { CMO_METRIC_SERIES, getLiveChartEmbed } from "@/lib/datawrapper";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chartKey = searchParams.get("chart") || "cacLtv";

    if (!CMO_METRIC_SERIES[chartKey]) {
      return NextResponse.json({ success: false, error: "Chart not found" }, { status: 404 });
    }

    const embed = await getLiveChartEmbed(chartKey as any);

    return NextResponse.json({
      success: true,
      chart: embed,
      availableCharts: Object.keys(CMO_METRIC_SERIES),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
