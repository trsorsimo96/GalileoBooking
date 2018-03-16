package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.GroupAirlineAlliance;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the GroupAirlineAlliance entity.
 */
public interface GroupAirlineAllianceSearchRepository extends ElasticsearchRepository<GroupAirlineAlliance, Long> {
}
